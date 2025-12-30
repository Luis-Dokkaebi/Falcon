from playwright.sync_api import sync_playwright

def verify_mobile():
    with sync_playwright() as p:
        browser = p.chromium.launch(headless=True)
        # Emulate iPhone 12
        device = p.devices['iPhone 12']
        context = browser.new_context(**device)
        page = context.new_page()

        page.goto('http://localhost:8000')

        # Verify Mobile Menu Exists
        mobile_btn = page.locator('.mobile-menu-btn')
        if mobile_btn.is_visible():
            print("Mobile button visible")
            mobile_btn.click()
            page.wait_for_timeout(1000) # Wait for menu animation
            page.screenshot(path='verification/mobile_menu.png')

        # Verify Hero H1 Size (approx)
        h1 = page.locator('h1')
        box = h1.bounding_box()
        print(f"H1 Box: {box}")

        # Screenshot Hero section
        page.reload()
        page.screenshot(path='verification/mobile_hero.png')

        # Check Services Grid stacking
        services = page.locator('.services-grid')
        # Check if items are stacked (bounding box width vs page width)

        # Take full page screenshot (long)
        page.screenshot(path='verification/mobile_full.png', full_page=True)

        browser.close()

if __name__ == '__main__':
    verify_mobile()
