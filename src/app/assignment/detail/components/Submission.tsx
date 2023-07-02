interface SubmissionProps {
  fileInputRef: React.RefObject<HTMLInputElement>;
  handleButtonSubmissionClick: () => void;
}
const Submission = ({
  fileInputRef,
  handleButtonSubmissionClick,
}: SubmissionProps) => {
  return (
    <div className="flex flex-col w-full h-[150px] justify-center items-center bg-primaryLight-400 border-[2px] border-dashed border-secondaryDark-400 rounded-xl">
      <input type="file" ref={fileInputRef} className="hidden" multiple />
      <button
        onClick={handleButtonSubmissionClick}
        className="py-3 px-10 bg-primary-400 rounded-xl font-sen text-white text-button font-bold shadow-lg hover:scale-[1.05] active:scale-[0.98] transition-all"
      >
        Choose File
      </button>
    </div>
  );
};

export default Submission;
