import re

def fix_css():
    with open('style.css', 'r', encoding='utf-8') as f:
        css = f.read()

    # Reduce section gaps
    css = css.replace('--section-gap: clamp(7rem, 15vh, 12rem);', '--section-gap: clamp(5rem, 10vh, 8rem);')

    # Remove backgrounds from sections to make it continuous
    css = re.sub(r'(\.(?:intro|work|process|about|contact|motion|content-types)-section\s*\{[^}]*?)background-color:\s*var\(--bg-(?:dark|surface)\);', r'\1background-color: transparent;', css)

    # Remove hard borders
    css = css.replace('border-top: 1px solid var(--border-subtle);', '/* border-top: 1px solid var(--border-subtle); */')
    css = css.replace('border-bottom: 1px solid var(--border-subtle);', '/* border-bottom: 1px solid var(--border-subtle); */')
    css = css.replace('border-left: 2px solid var(--border-subtle);', '/* border-left: 2px solid var(--border-subtle); */')
    
    # Add a subtle continuous body gradient
    css = css.replace('body {\n  background-color: var(--bg-dark);', 'body {\n  background-color: var(--bg-dark);\n  background-image: radial-gradient(circle at 50% 0%, rgba(20, 20, 25, 1) 0%, var(--bg-dark) 100%);\n  background-attachment: fixed;')

    with open('style.css', 'w', encoding='utf-8') as f:
        f.write(css)

    print("CSS updated successfully!")

if __name__ == '__main__':
    fix_css()
