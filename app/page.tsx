import { FC } from "react";
import Todo from "../components/Todo";
import { Toaster } from "@/components/ui/toaster";
import Header from "@/components/Header";

const Home: FC = () => {
  return (
    <div>
      <Toaster />
      <Header />
      <Todo />
    </div>
  );
};

export default Home;
