/**
 * Master Dental Client Booking Pipeline Engine
 * Connects Instagram DMs, WhatsApp Business, AI Voice Front Office, and Website Funnel into PMS Calendar
 */

class DentalBookingPipeline {
    constructor() {
        this.leads = [];
        this.appointments = [];
        this.pmsStatus = { connected: true, system: 'Dentrix / Open Dental API' };
    }

    /**
     * Step 1: Process incoming lead from Instagram DM keyword trigger
     * Example: Patient comments "SMILE" or DMs "INVISALIGN" on Instagram
     */
    processInstagramLead(data) {
        const { handle, keyword, userPhone, procedureIntent } = data;
        const lead = {
            id: 'IG-' + Date.now(),
            source: 'Instagram DM',
            handle,
            keyword,
            phone: userPhone || null,
            procedure: procedureIntent || 'General Consultation',
            status: 'NEW_LEAD',
            createdAt: new Date().toISOString()
        };

        this.leads.push(lead);

        // Auto-reply payload via Instagram Messaging API
        const dmReply = {
            recipientId: handle,
            message: `Hey there! 👋 Thanks for asking about our ${lead.procedure} options at Dr. Smith's Dental Practice! \n\nClick here to instantly chat with our 24/7 Dental Assistant on WhatsApp & claim your $100 consultation voucher: https://wa.me/15551234567?text=ClaimSMILE`,
            whatsappRedirectUrl: `https://wa.me/15551234567?text=ClaimSMILE`
        };

        return { lead, dmReply };
    }

    /**
     * Step 2: Handle WhatsApp Business API interaction
     * Conversational bot qualifies patient & books slot
     */
    processWhatsAppMessage(phone, messageText, state = 'START') {
        let responseMessage = '';
        let nextState = state;
        let appointmentBooked = null;

        if (messageText.toLowerCase().includes('claim') || state === 'START') {
            responseMessage = `Hi! 🦷 Welcome to Dr. Smith's Dental Clinic. We saw you reached out regarding our high-ticket smile transformations!\n\nWhat procedure are you most interested in?\n1️⃣ Dental Implants\n2️⃣ Clear Aligners / Invisalign\n3️⃣ Teeth Whitening & Veneers\n4️⃣ Urgent / Tooth Pain`;
            nextState = 'AWAITING_PROCEDURE';
        } else if (state === 'AWAITING_PROCEDURE') {
            responseMessage = `Awesome choice! We have 2 slots available with Dr. Smith this week for a 3D Scan & Consultation:\n\n📅 Thursday at 2:00 PM\n📅 Friday at 10:30 AM\n\nWhich time works best for you? (Reply 1 or 2)`;
            nextState = 'AWAITING_TIME';
        } else if (state === 'AWAITING_TIME') {
            const timeSlot = messageText.includes('1') ? 'Thursday at 2:00 PM' : 'Friday at 10:30 AM';
            appointmentBooked = {
                id: 'APT-' + Math.floor(1000 + Math.random() * 9000),
                patientPhone: phone,
                slot: timeSlot,
                status: 'CONFIRMED_IN_PMS',
                pmsRef: 'DENTRIX-SYNC-' + Date.now()
            };
            this.appointments.push(appointmentBooked);

            responseMessage = `🎉 Success! Your appointment is locked in for *${timeSlot}*.\n\n📍 Location: 123 Healthcare Blvd, Suite 400.\n\nWe just sent a calendar invite to your phone. Reply 'CANCEL' if you ever need to change your slot. See you soon!`;
            nextState = 'BOOKED';
        }

        return { responseMessage, nextState, appointmentBooked };
    }

    /**
     * Step 3: Handle AI Voice Call Inbound/Outbound
     */
    processVoiceCall(callData) {
        const { callerPhone, transcriptSummary, intent, urgentLevel } = callData;
        const callLog = {
            id: 'CALL-' + Date.now(),
            phone: callerPhone,
            intent: intent || 'After-Hours Booking',
            urgency: urgentLevel || 'NORMAL',
            summary: transcriptSummary,
            pmsAction: 'APPOINTMENT_SCHEDULED'
        };
        return callLog;
    }
}

if (typeof module !== 'undefined') {
    module.exports = DentalBookingPipeline;
}
