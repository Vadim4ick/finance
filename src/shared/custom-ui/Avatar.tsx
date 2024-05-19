import Image from "next/image";

const Avatar = () => {
  return (
    <div>
      <Image
        src={"/noAvatar.png"}
        width={32}
        height={32}
        className="cursor-pointer rounded-full"
        alt="avatar"
      />
    </div>
  );
};

export { Avatar };
