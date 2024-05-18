import { AuthForm } from "@/features/AuthForm";

const AuthCard = () => {
  return (
    <div className="h-full px-4">
      <div className="space-y-4 pt-16 text-center">
        <h1 className="text-xl font-bold">Добро пожаловать!</h1>

        <p className="text-base text-[#7E8CA0]">
          Войдите в систему или создайте учетную запись!
        </p>
      </div>

      <AuthForm />
    </div>
  );
};

export { AuthCard };
