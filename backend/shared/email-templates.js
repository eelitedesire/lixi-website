const quoteEmailTemplate = (data) => `
<!DOCTYPE html>
<html>
<head>
  <style>
    body { font-family: Arial, sans-serif; line-height: 1.6; color: #333; }
    .container { max-width: 600px; margin: 0 auto; padding: 20px; }
    .header { background: #00c853; color: #060a07; padding: 20px; text-align: center; }
    .content { background: #f0f4ee; padding: 20px; }
    .field { margin-bottom: 15px; }
    .label { font-weight: bold; color: #00963e; }
  </style>
</head>
<body>
  <div class="container">
    <div class="header">
      <h1>New Quote Request - LIXI Energy Systems</h1>
    </div>
    <div class="content">
      <h2>Customer Information</h2>
      <div class="field"><span class="label">Name:</span> ${data.firstName} ${data.lastName}</div>
      <div class="field"><span class="label">Email:</span> ${data.email}</div>
      <div class="field"><span class="label">Phone:</span> ${data.phone}</div>
      ${data.company ? `<div class="field"><span class="label">Company:</span> ${data.company}</div>` : ''}
      
      <h2>System Requirements</h2>
      <div class="field"><span class="label">User Type:</span> ${data.userType}</div>
      <div class="field"><span class="label">Country:</span> ${data.country}</div>
      <div class="field"><span class="label">Monthly Bill:</span> $${data.monthlyBill}</div>
      <div class="field"><span class="label">Existing Solar:</span> ${data.hasSolar}</div>
      <div class="field"><span class="label">Voltage Preference:</span> ${data.voltage}</div>
      <div class="field"><span class="label">Capacity Needed:</span> ${data.capacity}</div>
      <div class="field"><span class="label">CARBONOZ Trading:</span> ${data.trading}</div>
      
      ${data.message ? `<h2>Message</h2><p>${data.message}</p>` : ''}
      
      <div class="field"><span class="label">Preferred Contact:</span> ${data.contactMethod}</div>
      <div class="field"><span class="label">Submitted:</span> ${new Date().toISOString()}</div>
    </div>
  </div>
</body>
</html>
`;

const contactEmailTemplate = (data) => `
<!DOCTYPE html>
<html>
<head>
  <style>
    body { font-family: Arial, sans-serif; line-height: 1.6; color: #333; }
    .container { max-width: 600px; margin: 0 auto; padding: 20px; }
    .header { background: #00c853; color: #060a07; padding: 20px; text-align: center; }
    .content { background: #f0f4ee; padding: 20px; }
    .field { margin-bottom: 15px; }
    .label { font-weight: bold; color: #00963e; }
  </style>
</head>
<body>
  <div class="container">
    <div class="header">
      <h1>New Contact Form Submission</h1>
    </div>
    <div class="content">
      <div class="field"><span class="label">Name:</span> ${data.name}</div>
      <div class="field"><span class="label">Email:</span> ${data.email}</div>
      ${data.phone ? `<div class="field"><span class="label">Phone:</span> ${data.phone}</div>` : ''}
      <div class="field"><span class="label">Subject:</span> ${data.subject}</div>
      <h2>Message</h2>
      <p>${data.message}</p>
      <div class="field"><span class="label">Submitted:</span> ${new Date().toISOString()}</div>
    </div>
  </div>
</body>
</html>
`;

module.exports = {
  quoteEmailTemplate,
  contactEmailTemplate,
};
