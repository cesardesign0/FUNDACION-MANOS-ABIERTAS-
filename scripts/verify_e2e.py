import os
from playwright.sync_api import sync_playwright

artifact_dir = r'C:\Users\Cjcor\.gemini\antigravity\brain\a57a22e4-4754-49c6-b8de-c19bdda11b25'

with sync_playwright() as p:
    browser = p.chromium.launch(headless=True)
    page = browser.new_page(viewport={'width': 1440, 'height': 900})

    logs = []
    errors = []
    page.on('console', lambda msg: logs.append(f'[{msg.type}] {msg.text}'))
    page.on('pageerror', lambda err: errors.append(f'{err.name}: {err.message}'))

    # 1. Public Site (Fundación Manos Abiertas en cdesign-studios)
    print('1. Testing Public Site & SEO Tags on fundacion-manos-abiertas.web.app...')
    page.goto('https://fundacion-manos-abiertas.web.app/', wait_until='networkidle', timeout=30000)
    page.wait_for_selector('#root > *', timeout=10000)

    # Check Title
    title = page.title()
    print('PAGE TITLE:', title)

    # Check WhatsApp Button
    wa_btn = page.locator('a[aria-label="Contactar por WhatsApp"]')
    print('WhatsApp Button count:', wa_btn.count())

    # Dismiss welcome modal if present
    modal_btn = page.locator('button', has_text='Continuar al Sitio Web')
    if modal_btn.count() > 0:
        modal_btn.first.click()
        page.wait_for_timeout(1000)

    # Take Screenshot of Clean Public Home
    page.screenshot(path=os.path.join(artifact_dir, 'fundacion_clean_home.png'), full_page=False)

    # 2. Scroll to Shop & Retreats
    print('2. Testing Shop & Retreats Sections...')
    page.locator('#retreats').scroll_into_view_if_needed()
    page.wait_for_timeout(1000)
    page.screenshot(path=os.path.join(artifact_dir, 'fundacion_retreats.png'), full_page=False)

    page.locator('#shop').scroll_into_view_if_needed()
    page.wait_for_timeout(1000)
    page.screenshot(path=os.path.join(artifact_dir, 'fundacion_shop.png'), full_page=False)

    # 3. Admin Login & Visual Editor
    print('3. Testing Admin Login and Visual Editor...')
    page.goto('https://fundacion-manos-abiertas.web.app/#admin', wait_until='networkidle', timeout=30000)
    page.locator('input[type=password]').fill('manosabiertas2026')
    page.locator('button', has_text='Ingresar').click()
    page.wait_for_timeout(3000)
    page.screenshot(path=os.path.join(artifact_dir, 'fundacion_admin_editor.png'), full_page=False)

    # 4. Check Original cdesign-studios.web.app is Intact
    print('4. Verifying original cdesign-studios.web.app is intact and untouched...')
    page.goto('https://cdesign-studios.web.app/', wait_until='networkidle', timeout=30000)
    page.wait_for_timeout(2000)
    cdesign_title = page.title()
    print('CDESIGN STUDIOS PAGE TITLE:', cdesign_title)
    page.screenshot(path=os.path.join(artifact_dir, 'cdesign_studios_intact.png'), full_page=False)

    browser.close()

    print('\n=== AUDIT RESULTS ===')
    if errors:
        print('ERRORS FOUND:', errors)
    else:
        print('[SUCCESS] ZERO runtime JavaScript errors found across all pages!')
