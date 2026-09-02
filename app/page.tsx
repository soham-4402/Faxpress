import Link from "next/link";
import { ArrowRight, CalendarDays, ShoppingBag } from "lucide-react";

export default function HomePage() {
  return (
    <main className="min-h-screen bg-white text-black">

      {/* Hero */}
      <section className="border-b border-gray-200">
        <div className="mx-auto flex min-h-[75vh] max-w-7xl items-center px-6 py-20 lg:px-8">
          <div className="max-w-4xl">

            <p className="text-sm font-medium uppercase tracking-[0.2em] text-gray-500">
              YOURBRAND
            </p>

            <h1 className="mt-5 text-5xl font-semibold leading-[1.05] tracking-tight sm:text-6xl lg:text-8xl">
              Simple.
              <br />
              Premium.
              <br />
              Designed for you.
            </h1>

            <p className="mt-8 max-w-xl text-base leading-7 text-gray-500">
              Discover products designed with simplicity, quality
              and everyday functionality in mind.
            </p>

            {/* Main Actions */}
            <div className="mt-10 flex flex-wrap gap-3">

              <Link
                href="/products"
                className="flex h-12 items-center gap-2 bg-black px-7 text-sm font-medium text-white transition hover:bg-gray-800"
              >
                Shop Now
                <ArrowRight size={17} />
              </Link>

              <Link
                href="/booking"
                className="flex h-12 items-center gap-2 border border-gray-300 px-7 text-sm font-medium transition hover:border-black"
              >
                <CalendarDays size={17} />
                Book Now
              </Link>

            </div>
          </div>
        </div>
      </section>

      {/* Quick Navigation */}
      <section className="border-b border-gray-200">
        <div className="mx-auto grid max-w-7xl grid-cols-1 sm:grid-cols-3">

          {/* Products */}
          <Link
            href="/products"
            className="group border-b border-gray-200 p-8 transition hover:bg-gray-50 sm:border-b-0 sm:border-r"
          >
            <ShoppingBag size={22} />

            <h2 className="mt-6 text-xl font-semibold">
              Shop Products
            </h2>

            <p className="mt-2 text-sm leading-6 text-gray-500">
              Browse our complete product collection.
            </p>

            <div className="mt-6 flex items-center gap-2 text-sm font-medium">
              Explore
              <ArrowRight
                size={15}
                className="transition-transform group-hover:translate-x-1"
              />
            </div>
          </Link>

          {/* Booking */}
          <Link
            href="/booking"
            className="group border-b border-gray-200 p-8 transition hover:bg-gray-50 sm:border-b-0 sm:border-r"
          >
            <CalendarDays size={22} />

            <h2 className="mt-6 text-xl font-semibold">
              Book a Slot
            </h2>

            <p className="mt-2 text-sm leading-6 text-gray-500">
              Choose your preferred date and available time.
            </p>

            <div className="mt-6 flex items-center gap-2 text-sm font-medium">
              Make Booking
              <ArrowRight
                size={15}
                className="transition-transform group-hover:translate-x-1"
              />
            </div>
          </Link>

          {/* Dashboard */}
          <Link
            href="/dashboard"
            className="group p-8 transition hover:bg-gray-50"
          >
            <div className="h-5 w-5 rounded-full bg-black" />

            <h2 className="mt-6 text-xl font-semibold">
              My Account
            </h2>

            <p className="mt-2 text-sm leading-6 text-gray-500">
              View your orders, bookings and account details.
            </p>

            <div className="mt-6 flex items-center gap-2 text-sm font-medium">
              Dashboard
              <ArrowRight
                size={15}
                className="transition-transform group-hover:translate-x-1"
              />
            </div>
          </Link>

        </div>
      </section>

      {/* Featured Products */}
      <section className="border-b border-gray-200">
        <div className="mx-auto max-w-7xl px-6 py-20 lg:px-8">

          <div className="flex items-end justify-between">
            <div>
              <p className="text-sm uppercase tracking-widest text-gray-500">
                Collection
              </p>

              <h2 className="mt-2 text-3xl font-semibold tracking-tight">
                Featured Products
              </h2>
            </div>

            <Link
              href="/products"
              className="hidden items-center gap-2 text-sm font-medium sm:flex"
            >
              View All
              <ArrowRight size={15} />
            </Link>
          </div>

          <div className="mt-10 grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3">

            {/* Product 1 */}
            <Link
              href="/products/1"
              className="group"
            >
              <div className="aspect-square overflow-hidden bg-gray-100">
                <img
                  src="/images/product1.jpg"
                  alt="Premium Product"
                  className="h-full w-full object-cover transition duration-500 group-hover:scale-105"
                />
              </div>

              <div className="mt-4 flex items-start justify-between">
                <div>
                  <h3 className="font-medium">
                    Premium Product
                  </h3>

                  <p className="mt-1 text-sm text-gray-500">
                    Minimal Collection
                  </p>
                </div>

                <span className="font-medium">
                  ₹2,499
                </span>
              </div>
            </Link>

            {/* Product 2 */}
            <Link
              href="/products/2"
              className="group"
            >
              <div className="aspect-square overflow-hidden bg-gray-100">
                <img
                  src="/images/product2.jpg"
                  alt="Essential Product"
                  className="h-full w-full object-cover transition duration-500 group-hover:scale-105"
                />
              </div>

              <div className="mt-4 flex items-start justify-between">
                <div>
                  <h3 className="font-medium">
                    Essential Collection
                  </h3>

                  <p className="mt-1 text-sm text-gray-500">
                    Everyday Essentials
                  </p>
                </div>

                <span className="font-medium">
                  ₹1,999
                </span>
              </div>
            </Link>

            {/* Product 3 */}
            <Link
              href="/products/3"
              className="group"
            >
              <div className="aspect-square overflow-hidden bg-gray-100">
                <img
                  src="/images/product3.jpg"
                  alt="Classic Product"
                  className="h-full w-full object-cover transition duration-500 group-hover:scale-105"
                />
              </div>

              <div className="mt-4 flex items-start justify-between">
                <div>
                  <h3 className="font-medium">
                    Classic Series
                  </h3>

                  <p className="mt-1 text-sm text-gray-500">
                    Timeless Design
                  </p>
                </div>

                <span className="font-medium">
                  ₹2,999
                </span>
              </div>
            </Link>

          </div>

        </div>
      </section>

      {/* Final CTA */}
      <section className="bg-black text-white">
        <div className="mx-auto max-w-7xl px-6 py-24 text-center lg:px-8">

          <h2 className="text-4xl font-semibold tracking-tight sm:text-5xl">
            Ready to get started?
          </h2>

          <p className="mx-auto mt-5 max-w-xl text-gray-400">
            Explore our products or book a convenient time slot.
          </p>

          <div className="mt-8 flex flex-wrap justify-center gap-3">

            <Link
              href="/products"
              className="flex h-12 items-center gap-2 bg-white px-7 text-sm font-medium text-black transition hover:bg-gray-200"
            >
              Shop Products
              <ArrowRight size={17} />
            </Link>

            <Link
              href="/booking"
              className="flex h-12 items-center gap-2 border border-gray-700 px-7 text-sm font-medium text-white transition hover:bg-white hover:text-black"
            >
              Book a Slot
              <CalendarDays size={17} />
            </Link>

          </div>

        </div>
      </section>

    </main>
  );
}
