import { createServerFn } from "@tanstack/react-start";
import { z } from "zod";

const leadSchema = z.object({
  name: z.string().min(1, "Имя обязательно"),
  phone: z.string().min(1, "Телефон обязателен"),
});

export const submitLead = createServerFn({ method: "POST" })
  .inputValidator((data) => leadSchema.parse(data))
  .handler(async ({ data }) => {
    console.log("Получена новая заявка:", data);
    
    // В будущем здесь будет код подключения к вашей БД
    // const db = await connectToYourRussianDB();
    // await db.insert(data);

    return { success: true };
  });
