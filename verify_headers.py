from playwright.sync_api import sync_playwright
import os

def run():
    with sync_playwright() as p:
        browser = p.chromium.launch()
        page = browser.new_page()

        # Base path for local files
        base_path = os.getcwd()

        files_to_check = [
            ("index.html", "index_header.png"),
            ("our_company.html", "company_header.png"),
            ("services/mechanical.html", "mechanical_header.png"),
            ("services/fabrication.html", "fabrication_header.png")
        ]

        if not os.path.exists("verification"):
            os.makedirs("verification")

        for relative_path, screenshot_name in files_to_check:
            full_path = f"file://{os.path.join(base_path, relative_path)}"
            print(f"Checking {full_path}...")
            try:
                page.goto(full_path)
                # Take screenshot of the header
                header = page.locator("header")
                header.screenshot(path=f"verification/{screenshot_name}")
                print(f"Saved verification/{screenshot_name}")
            except Exception as e:
                print(f"Error checking {relative_path}: {e}")

        browser.close()

if __name__ == "__main__":
    run()
