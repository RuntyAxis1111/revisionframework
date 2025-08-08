interface BubbleProps {
  role: "user" | "bot";
  text: string;
  link?: string;
}

export default function ChatBubble({ role, text, link }: BubbleProps) {
  const isBot = role === "bot";
  return (
    <div className={`flex ${isBot ? "items-start" : "items-end justify-end"} gap-3`}>
      {isBot && (
        <img
          src="/assets/pinguinohybe.png"
          alt="pinguino Json"
          className="h-12 w-12 rounded-full border border-neutral-300 shadow-sm
                     animate-[pulse_4s_ease-in-out_infinite]"
        />
      )}

      <div
        className={`max-w-[60%] rounded-xl px-4 py-2 text-sm whitespace-pre-wrap
          ${isBot
            ? "bg-neutral-100 text-black border border-neutral-200"
            : "bg-black text-white ml-auto"}`}
      >
        {text}
        {link && (
          <div className="mt-2">
            <a
              href={link}
              target="_blank"
              rel="noopener noreferrer"
              className="text-blue-600 underline"
            >
              Ver reporte
            </a>
          </div>
        )}
      </div>
    </div>
  );
}