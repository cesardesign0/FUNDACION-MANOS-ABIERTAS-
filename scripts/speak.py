import sys
import os
import asyncio
import tempfile
import argparse
import subprocess
import ctypes
import time

DEFAULT_VOICE = "es-MX-DaliaNeural"  # Natural Spanish voice (alternatives: es-ES-AlvaroNeural, es-US-PalomaNeural, es-ES-ElviraNeural)
MUTE_FILE = os.path.expanduser("~/.gemini/voice_muted")

async def generate_speech(text: str, voice: str, output_file: str):
    import edge_tts
    communicate = edge_tts.Communicate(text, voice)
    await communicate.save(output_file)

def play_audio_windows(file_path: str):
    """Play audio on Windows using Windows MCI (winmm.dll) or PowerShell fallback"""
    try:
        # Check if winmm is available
        mci = ctypes.windll.winmm.mciSendStringW
        # Open and play
        alias = f"tts_{int(time.time() * 1000)}"
        short_path_buf = ctypes.create_unicode_buffer(500)
        ctypes.windll.kernel32.GetShortPathNameW(file_path, short_path_buf, 500)
        short_path = short_path_buf.value or file_path

        open_res = mci(f'open "{short_path}" type mpegvideo alias {alias}', None, 0, 0)
        if open_res == 0:
            mci(f'play {alias} wait', None, 0, 0)
            mci(f'close {alias}', None, 0, 0)
            return True
    except Exception as e:
        pass

    # Fallback to PowerShell MediaPlayer
    try:
        ps_cmd = (
            f"Add-Type -AssemblyName presentationCore; "
            f"$player = New-Object System.Windows.Media.MediaPlayer; "
            f"$player.Open([System.Uri]'{file_path.replace(chr(92), '/')}'); "
            f"$player.Play(); "
            f"Start-Sleep -Milliseconds 500; "
            f"while ($player.NaturalDuration.HasTimeSpan -eq $false) {{ Start-Sleep -Milliseconds 100 }}; "
            f"$duration = $player.NaturalDuration.TimeSpan.TotalSeconds; "
            f"Start-Sleep -Seconds ([math]::Ceiling($duration) + 1); "
            f"$player.Close();"
        )
        subprocess.run(["powershell", "-NoProfile", "-Command", ps_cmd], check=True, stdout=subprocess.DEVNULL, stderr=subprocess.DEVNULL)
        return True
    except Exception:
        pass

    return False

def main():
    parser = argparse.ArgumentParser(description="Antigravity Spoken Summary Voice Assistant via edge-tts")
    parser.add_argument("text", nargs="*", help="Text to speak")
    parser.add_argument("--voice", "-v", default=DEFAULT_VOICE, help=f"Voice to use (default: {DEFAULT_VOICE})")
    parser.add_argument("--mute", action="store_true", help="Mute voice synthesis")
    parser.add_argument("--unmute", action="store_true", help="Unmute voice synthesis")
    parser.add_argument("--check-muted", action="store_true", help="Check if voice is muted")

    args = parser.parse_args()

    # Handle mute toggle
    if args.mute:
        os.makedirs(os.path.dirname(MUTE_FILE), exist_ok=True)
        with open(MUTE_FILE, "w") as f:
            f.write("muted")
        print("🔇 Asistente de voz silenciado.")
        return

    if args.unmute:
        if os.path.exists(MUTE_FILE):
            os.remove(MUTE_FILE)
        print("🔊 Asistente de voz activado.")
        return

    if args.check_muted:
        print("MUTED" if os.path.exists(MUTE_FILE) else "ACTIVE")
        return

    # Check if currently muted
    if os.path.exists(MUTE_FILE):
        return

    # Determine text to speak
    text = " ".join(args.text).strip()
    if not text:
        if not sys.stdin.isatty():
            text = sys.stdin.read().strip()

    if not text:
        text = "Tarea finalizada con éxito."

    temp_path = os.path.join(tempfile.gettempdir(), f"antigravity_voice_{int(time.time() * 1000)}.mp3")

    try:
        asyncio.run(generate_speech(text, args.voice, temp_path))
        play_audio_windows(temp_path)
    except Exception as e:
        print(f"Error generando voz: {e}", file=sys.stderr)
    finally:
        if os.path.exists(temp_path):
            try:
                os.remove(temp_path)
            except Exception:
                pass

if __name__ == "__main__":
    main()
