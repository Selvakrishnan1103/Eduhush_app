"use client";

export default function HelpSupport() {
  return (
    <div className="min-h-screen flex justify-center items-center bg-white px-6 py-20">
      <div className="bg-white shadow-lg rounded-3xl p-8 max-w-2xl w-full border border-[#3C7BAA]/30 hover:shadow-[#3C7BAA]/30 hover:shadow-xl transition-all duration-300">
        <h1 className="text-3xl font-bold text-center mb-3 text-[#3C7BAA]">
          Help Hub
        </h1>

        <p className="text-[#3C7BAA] text-center mb-6">
          Got questions or need help? We're here to assist you anytime!
        </p>

        <div className="bg-gradient-to-r from-[#3C7BAA]/10 to-[#3C7BAA]/5 p-5 rounded-xl border border-[#3C7BAA]/20">
          <ul className="space-y-4 text-[#3C7BAA] text-lg">
            <li>
              📧 <span className="font-semibold">Email:</span>{" "}
              <a
                href="mailto:selvakrish601@gmail.com"
                className="text-[#3C7BAA] hover:underline font-medium"
              >
                selvakrish601@gmail.com
              </a>
            </li>
            <li>
              ☎️ <span className="font-semibold">Phone:</span>{" "}
              <a
                href="tel:+919789679544"
                className="text-[#3C7BAA] hover:underline font-medium"
              >
                +91-9789679544
              </a>
            </li>
          </ul>
        </div>

        {/* <div className="mt-8 text-center">
          <p className="text-[#3C7BAA]">
            💡 Visit our{" "}
            <a
              href="/faq"
              className="underline text-[#3C7BAA] hover:opacity-80 font-medium"
            >
              FAQ
            </a>{" "}
            page for quick answers to common questions.
          </p>
        </div> */}
      </div>
    </div>
  );
}
