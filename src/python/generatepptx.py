from pptx import Presentation

# Load the uploaded PowerPoint template
template_path = "Template.pptx"
prs = Presentation(template_path)

# Define the slide content
slides_content = [
    {
        "title": "The Case for Passkeys: Enhancing Security and User Experience",
        "content": "Why It's Time to Move Beyond Passwords\nPresented by: Michael T Wolfgang, Architect, Application Systems"
    },
    {
        "title": "The Problem with Passwords",
        "content": (
            "- 81% of hacking-related breaches involve stolen or weak passwords (Verizon DBIR 2024)\n"
            "- 68% of IT leaders admit to reusing old system passwords (Ponemon Institute)\n"
            "- Users often choose simple, memorable passwords\n"
            "- Password reuse across platforms is rampant\n"
            "- Susceptible to phishing, brute-force, and credential stuffing attacks"
        )
    },
    {
        "title": "User Experience Challenges",
        "content": (
            "- Forgotten passwords lead to frequent resets\n"
            "- Complex password rules frustrate users\n"
            "- Average user spends 12+ hours/year managing passwords\n"
            "- 20–50% of help desk calls are password-related (Gartner)"
        )
    },
    {
        "title": "What Are Passkeys?",
        "content": (
            "- Cryptographic credentials stored on a user’s device\n"
            "- Use public/private key pairs\n"
            "- Authenticate via biometrics or device PIN\n"
            "- No shared secrets transmitted or stored on servers"
        )
    },
    {
        "title": "Security Benefits of Passkeys",
        "content": (
            "- Phishing-resistant: no credentials to steal or intercept\n"
            "- No reuse risk: unique to each service and device\n"
            "- Resilient to breaches: private keys never leave the device\n"
            "- Based on FIDO2 and WebAuthn standards"
        )
    },
    {
        "title": "User Experience Benefits",
        "content": (
            "- Frictionless login via biometrics or device-based authentication\n"
            "- No password fatigue: nothing to remember or reset\n"
            "- Seamless cross-platform sync (Apple, Google, Microsoft)\n"
            "- Faster onboarding and reduced drop-off"
        )
    },
    {
        "title": "Real-World Impact",
        "content": (
            "- Google: 50% reduction in account recovery requests after enabling passkeys\n"
            "- Microsoft: 99.9% of account compromise attacks blocked with passwordless authentication\n"
            "- Verizon DBIR 2024: 62% of breaches involved credential misuse"
        )
    },
    {
        "title": "Strategic Recommendation",
        "content": (
            "- Short-Term: Enable passkey support for high-risk user flows\n"
            "- Mid-Term: Educate users and promote passkey adoption\n"
            "- Long-Term: Phase out passwords entirely for consumer accounts"
        )
    },
    {
        "title": "Call to Action",
        "content": (
            "- Why Now?\n"
            "  • Security threats are escalating\n"
            "  • User expectations are evolving\n"
            "- Next Steps:\n"
            "  • Pilot passkey login for internal tools\n"
            "  • Evaluate vendor support and ecosystem readiness"
        )
    },
    {
        "title": "Q&A",
        "content": "Let’s discuss how we can make authentication safer and simpler."
    }
]

# Use a basic layout from the template for new slides
layout = prs.slide_layouts[55]  # Title and content layout

# Add slides to the presentation
for slide_data in slides_content:
    slide = prs.slides.add_slide(layout)
    title = slide.shapes.title
    content = slide.placeholders[1]
    title.text = slide_data["title"]
    content.text = slide_data["content"]

# Save the updated presentation
output_file = "Passkeys_vs_Passwords_Presentation.pptx"
prs.save(output_file)

print(f"Presentation created and saved as {output_file}")

