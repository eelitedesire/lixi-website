const { z } = require('zod');

const quoteSchema = z.object({
  userType: z.string().min(1),
  country: z.string().min(1),
  monthlyBill: z.number().min(0),
  hasSolar: z.string(),
  voltage: z.string(),
  capacity: z.string(),
  trading: z.string(),
  firstName: z.string().min(1),
  lastName: z.string().min(1),
  email: z.string().email(),
  phone: z.string().min(1),
  company: z.string().optional(),
  message: z.string().optional(),
  contactMethod: z.string(),
});

const contactSchema = z.object({
  name: z.string().min(1),
  email: z.string().email(),
  phone: z.string().optional(),
  subject: z.string().min(1),
  message: z.string().min(1),
});

const newsletterSchema = z.object({
  email: z.string().email(),
});

module.exports = {
  quoteSchema,
  contactSchema,
  newsletterSchema,
};
