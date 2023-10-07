import { z } from "zod";

export const OnlyIdObject = z.object({ id: z.string() });
