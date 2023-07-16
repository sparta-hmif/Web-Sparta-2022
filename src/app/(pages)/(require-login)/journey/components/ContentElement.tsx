const ContentElement = ({
  title,
  value,
  onChange,
  viewMode,
  name,
}: {
  title: string;
  value: string;
  onChange: (event: React.ChangeEvent<HTMLTextAreaElement>) => void;
  viewMode: boolean;
  name : string,
}) => {
  return (
    <div className="h-[26vh] md:h-[22vh] w-full flex flex-col">
      <h5 className="text-base font-bold md:text-xl flex-none">{title}</h5>
      {viewMode ? (
        <div className="flex-1 w-full overflow-y-auto">
          <p className={`body-1 text-sm md:text-base ${!value && "text-neutral-400"}`}>
            {value || "Belum ada catatan"}
          </p>
        </div>
      ) : (
        <textarea
          name={name}
          className="resize-none text-sm px-2 flex-1 rounded-xl body-1 bg-neutral-100 mt-2 border-secondaryDark-400 hover:border-secondary-400 focus:outline-none focus:ring-0 focus:border-secondary-400"
          placeholder="Ketik disini..."
          value={value}
          onChange={onChange}
        />
      )}
    </div>
  );
};

export default ContentElement;
