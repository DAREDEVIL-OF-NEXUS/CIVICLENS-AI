from APP.SERVICES.EMAIL_SERVICE import send_email

def send_submission_notification(contact: str, complaint_data: dict):
    subject = f"Complaint Received: #{complaint_data['id']}"
    body = f"We have received your complaint regarding '{complaint_data['title']}'.\n\nDetails:\nLocation: {complaint_data['location']}\nCategory: {complaint_data['category']}\nUrgency: {complaint_data['urgency']}\nDepartment: {complaint_data['department']}\n\nWe will update you as the status changes."
    print(f"Sending submission notification to {contact}...")
    send_email(contact, subject, body)

def send_status_notification(contact: str, complaint_data: dict):
    subject = f"Status Update on Complaint #{complaint_data['id']}"
    body = f"Your complaint '{complaint_data['title']}' has been updated.\n\nNew Status: {complaint_data['status']}\nPriority Score: {complaint_data['priority_score']}\n"
    print(f"Sending status notification to {contact}...")
    send_email(contact, subject, body)
