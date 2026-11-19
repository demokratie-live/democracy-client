import { z } from "zod";

/**
 * Schemas gemäß specs/001-in-app-donations/contracts/donations-api.md.
 * Beträge sind immer Integer in Cent, Währung immer EUR.
 */

export const DonationIntervalSchema = z.enum(["one_time", "monthly"]);
export type DonationInterval = z.infer<typeof DonationIntervalSchema>;

export const PaymentMethodTypeSchema = z.enum(["card", "sepa_debit", "paypal"]);
export type PaymentMethodType = z.infer<typeof PaymentMethodTypeSchema>;

const Cents = z.number().int().nonnegative();

export const DonationFeesSchema = z.object({
  cardPct: z.number().nonnegative(),
  cardFixedCents: Cents,
  sepaFixedCents: Cents,
  billingPct: z.number().nonnegative(),
});
export type DonationFees = z.infer<typeof DonationFeesSchema>;

export const DonationConfigSchema = z.object({
  enabled: z.boolean(),
  publishableKey: z.string().startsWith("pk_").nullable(),
  merchantDisplayName: z.string(),
  merchantCountryCode: z.string().length(2),
  defaultInterval: DonationIntervalSchema,
  minAmountCents: Cents,
  maxAmountCents: Cents,
  presets: z.object({ one_time: z.array(Cents), monthly: z.array(Cents) }),
  paymentMethodTypes: z.object({
    one_time: z.array(PaymentMethodTypeSchema),
    monthly: z.array(PaymentMethodTypeSchema),
  }),
  fees: DonationFeesSchema,
  portalLoginUrl: z.string().url().nullable(),
  bankTransfer: z.object({ holder: z.string(), iban: z.string(), bic: z.string() }),
  legal: z.object({
    privacyUrl: z.string().url(),
    nonprofitProofUrl: z.string().url(),
    simplifiedReceiptUrl: z.string().url(),
  }),
});
export type DonationConfig = z.infer<typeof DonationConfigSchema>;

export const DonationErrorBodySchema = z.object({
  error: z.object({ code: z.string(), message: z.string() }),
});

/** Body von POST /one-time und POST /monthly. */
export interface DonationRequestBody {
  amountCents: number;
  coverFees: boolean;
  email?: string;
  paymentMethodId: string;
  platform: "ios" | "android";
  appVersion?: string;
}

export const OneTimeDonationResponseSchema = z.object({
  clientSecret: z.string(),
  paymentIntentId: z.string(),
  chargedAmountCents: Cents,
});
export type OneTimeDonationResponse = z.infer<typeof OneTimeDonationResponseSchema>;

export const MonthlyDonationCreatedSchema = z.object({
  clientSecret: z.string(),
  subscriptionId: z.string(),
  chargedAmountCents: Cents,
});
export type MonthlyDonationCreated = z.infer<typeof MonthlyDonationCreatedSchema>;

export const MonthlyDonationStatusSchema = z.object({
  status: z.enum(["incomplete", "active", "past_due", "canceled", "incomplete_expired"]),
  cancelAtPeriodEnd: z.boolean(),
  amountCents: Cents,
  baseAmountCents: Cents,
  coverFees: z.boolean(),
  currentPeriodEnd: z.string().nullable(),
  paymentMethod: z.object({ type: z.string(), label: z.string() }).nullable(),
  lastPaymentError: z.object({ message: z.string(), at: z.string() }).nullable(),
});
export type MonthlyDonationStatus = z.infer<typeof MonthlyDonationStatusSchema>;

export const PortalSessionSchema = z.object({ url: z.string().url() });
