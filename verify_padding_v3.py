from playwright.sync_api import sync_playwright
import time

def run():
    with sync_playwright() as p:
        browser = p.chromium.launch()
        page = browser.new_page()
        page.set_viewport_size({"width": 1280, "height": 800})

        # Define pages to verify
        pages = [
            {"url": "http://localhost:8080/services/fabrication.html", "name": "fabrication_desktop_v3.png"},
            {"url": "http://localhost:8080/services/controlled.html", "name": "controlled_desktop_v3.png"},
            {"url": "http://localhost:8080/our_company.html", "name": "our_company_desktop_v3.png"}
        ]

        for item in pages:
            print(f"Navigating to {item['url']}...")
            page.goto(item['url'])
            # Wait for preloader to disappear (it has id="preloader")
            try:
                page.wait_for_selector("#preloader", state="hidden", timeout=5000)
            except:
                print("Preloader didn't vanish or not found, proceeding...")

            # Wait a bit more for animations
            time.sleep(2)

            page.screenshot(path=item['name'])
            print(f"Captured {item['name']}")

        browser.close()

if __name__ == "__main__":
    run()
