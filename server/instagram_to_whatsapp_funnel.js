/**
 * Instagram Content Script & Carousel Generator + DM Webhook Automation
 * Generates viral dental scripts, carousel templates, and handles Instagram DM keywords
 */

const DENTAL_INSTAGRAM_TEMPLATES = [
    {
        topic: "Dental Implants vs Dentures",
        caption: "Thinking about replacing missing teeth? Here is why 90% of dentists recommend Dental Implants over traditional dentures. 👇\n\nComment 'IMPLANT' below and our AI Assistant will instantly send you our 2026 Price Guide & 3D Scan Voucher! 🎁",
        carouselSlides: [
            { slide: 1, title: "Missing Teeth?", subtitle: "Implants vs Dentures: The Truth" },
            { slide: 2, title: "1. Bone Preservation", text: "Implants preserve jawbone density. Dentures allow bone loss over time." },
            { slide: 3, title: "2. Chewing Power", text: "Implants restore 95% chewing power. Dentures restore only 25-30%." },
            { slide: 4, title: "3. Lifetime Value", text: "Implants last 25+ years. Dentures need replacing every 5-7 years." },
            { slide: 5, title: "Claim Your $100 Voucher", text: "Comment 'IMPLANT' to get instant booking link on WhatsApp!" }
        ],
        triggerKeyword: "IMPLANT"
    },
    {
        topic: "Invisalign Clear Aligners",
        caption: "Straighten your teeth without anyone knowing! 🤫 No metal wires, no restrictions.\n\nComment 'SMILE' to check your eligibility & get a 3D Invisalign preview!",
        carouselSlides: [
            { slide: 1, title: "Secret to a Perfect Smile", subtitle: "Why Adults Choose Invisalign in 2026" },
            { slide: 2, title: "Virtually Invisible", text: "Clear aligners fit seamlessly into your professional and social life." },
            { slide: 3, title: "Eat Anything You Want", text: "Simply pop them out during meals and pop them back in." },
            { slide: 4, title: "Faster Results", text: "Average treatment time is 6 to 12 months with modern 3D tracking." },
            { slide: 5, title: "Get Your 3D Scan", text: "Comment 'SMILE' for instant WhatsApp booking!" }
        ],
        triggerKeyword: "SMILE"
    }
];

function generateInstagramPost(procedureType) {
    const template = DENTAL_INSTAGRAM_TEMPLATES.find(t => t.topic.toLowerCase().includes(procedureType.toLowerCase())) || DENTAL_INSTAGRAM_TEMPLATES[0];
    return template;
}

function handleInstagramDMWebhook(dmPayload) {
    const { senderId, text } = dmPayload;
    const cleanText = text.toUpperCase().trim();

    let triggerMatch = DENTAL_INSTAGRAM_TEMPLATES.find(t => cleanText.includes(t.triggerKeyword));
    if (!triggerMatch) {
        triggerMatch = DENTAL_INSTAGRAM_TEMPLATES[0];
    }

    return {
        recipientId: senderId,
        autoReply: `Hey! Thanks for commenting on our post! 🦷\n\nClick here to open WhatsApp & claim your ${triggerMatch.triggerKeyword} Special Consultation with Dr. Smith:\nhttps://wa.me/15551234567?text=Claim_${triggerMatch.triggerKeyword}`,
        redirectUrl: `https://wa.me/15551234567?text=Claim_${triggerMatch.triggerKeyword}`
    };
}

if (typeof module !== 'undefined') {
    module.exports = { DENTAL_INSTAGRAM_TEMPLATES, generateInstagramPost, handleInstagramDMWebhook };
}
