// Aby wyswietlić zawartosc naszej strony home musimy skorzystac z Outlet. Outlet jest komponentem, ktory sluzy do renderowania zawartosci naszej strony w miejscu, w ktorym go umiescimy. W naszym przypadku mamy Header, ktory ma sie pojawic tylko na stronie home, a nie na innych podstronach.
import { Outlet } from "react-router";
import Header from "~/components/Header";

const HomeLayout = () => {
  return (
    <>
      <Header />
      <section className="max-w-6xl mx-auto px-6 my-8">
        <Outlet />
      </section>
    </>
  );
};

export default HomeLayout;
