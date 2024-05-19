/* eslint-disable react/display-name */
"use client";

import { SubmitHandler, useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { toast } from "sonner";
import { memo, useEffect } from "react";
import { formatErrors } from "@/shared/utils/index.utils";
import { FormButtons } from "./FormButtons";
import {
  $currentAuthForm,
  FormAuthSchema,
  formAuthSchema,
  useCreateUser,
  useLoginUser,
} from "@/entities/AuthForm";
import { useUnit } from "effector-react";
import { AnimatePresence, motion } from "framer-motion";
import { Input } from "@/shared/custom-ui/Input";

const AuthForm = memo(() => {
  const currentType = useUnit($currentAuthForm);

  const mutationCreateUser = useCreateUser();
  const mutationLoginUser = useLoginUser();

  const {
    register,
    handleSubmit,
    reset,
    formState: { errors, isSubmitting, submitCount },
  } = useForm<FormAuthSchema>({
    resolver: zodResolver(formAuthSchema),
  });

  const onSubmit: SubmitHandler<FormAuthSchema> = (data) => {
    if (currentType === "register") {
      mutationCreateUser.mutate(data);
    } else {
      mutationLoginUser.mutate(data);
    }
  };

  useEffect(() => {
    if (Object.values(errors).length > 0 && submitCount > 0) {
      const errorMessage = formatErrors(errors);

      toast.error(errorMessage);
    }
  }, [isSubmitting, errors, submitCount]);

  useEffect(() => {
    if (currentType) {
      reset();
    }
  }, [currentType, reset]);

  return (
    <form onSubmit={handleSubmit(onSubmit)} className="pt-20">
      <div
        style={{
          boxShadow:
            "rgba(0, 0, 0, 0.08) 0px 5px 15px 0px, rgba(25, 28, 33, 0.2) 0px 15px 35px -5px, rgba(0, 0, 0, 0.07) 0px 0px 0px 1px",
        }}
        className="mx-auto w-full max-w-[390px] rounded-[10px] border border-opacity-5 p-6"
      >
        <motion.h1
          key={currentType}
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          className="pb-[30px] text-center text-xl font-bold"
        >
          {currentType === "auth" ? "Авторизация" : "Регистрация"}
        </motion.h1>

        <div className="flex flex-col gap-3 pb-5">
          <AnimatePresence>
            {currentType === "register" && (
              <motion.div
                className="w-full"
                key={`${currentType}`}
                initial={{ opacity: 0, y: -20 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -20 }}
                transition={{ duration: 0.5 }}
              >
                <Input
                  {...register("username")}
                  label="Введите имя"
                  placeholder="username"
                  type="text"
                  className="w-full"
                  error={Boolean(errors.username)}
                />
              </motion.div>
            )}
          </AnimatePresence>

          <Input
            {...register("email")}
            label="Введите email"
            placeholder="email"
            type="text"
            className="w-full"
            error={Boolean(errors.email)}
          />

          <Input
            {...register("password")}
            label="Введите пароль"
            placeholder="Password"
            type="password"
            className="w-full"
            error={Boolean(errors.password)}
          />
        </div>

        <FormButtons />
      </div>
    </form>
  );
});

export { AuthForm };
