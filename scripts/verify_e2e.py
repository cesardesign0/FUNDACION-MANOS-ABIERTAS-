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

    # 1. Public Site
    print('1. Testing Public Site & SEO Tags...')
    page.goto('https://manos-abiertas-jesus-maria.web.app/', wait_until='networkidle', timeout=30000)
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
    page.screenshot(path=os.path.join(artifact_dir, 'e2e_clean_public_home.png'), full_page=False)

    # 2. Scroll to Shop & Retreats
    print('2. Testing Shop & Retreats Sections...')
    page.locator('#retreats').scroll_into_view_if_needed()
    page.wait_for_timeout(1000)
    page.screenshot(path=os.path.join(artifact_dir, 'e2e_retreats_section.png'), full_page=False)

    page.locator('#shop').scroll_into_view_if_needed()
    page.wait_for_timeout(1000)
    page.screenshot(path=os.path.join(artifact_dir, 'e2e_shop_section.png'), full_page=False)

    # 3. Admin Login & Visual Editor
    print('3. Testing Admin Login and Visual Editor...')
    page.goto('https://manos-abiertas-jesus-maria.web.app/#admin', wait_until='networkidle', timeout=30000)
    page.locator('input[type=password]').fill('manosabiertas2026')
    page.locator('button', has_text='Ingresar').click()
    page.wait_for_timeout(3000)
    page.screenshot(path=os.path.join(artifact_dir, 'e2e_admin_editor.png'), full_page=False)

    browser.close()

    print('\n=== AUDIT RESULTS ===')
    if errors:
        print('ERRORS FOUND:', errors)
    else:
        print('[SUCCESS] ZERO runtime JavaScript errors found across all pages!')
