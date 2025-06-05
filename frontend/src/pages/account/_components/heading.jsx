import Button from "../../../components/ui/button";

export default function Heading({ name, onClick }) {
  return (
    <div className="md:flex md:items-center md:justify-between">
      <div className="min-w-0 flex-1">
        <h2 className="text-2xl/7 font-bold text-gray-900 sm:truncate sm:text-3xl sm:tracking-tight">
          {name}
        </h2>
      </div>
      <div className="mt-4 flex gap-2 md:mt-0 md:ml-4">
        <Button className="rounded-md text-sm font-semibold ring-1 ring-gray-300 ring-inset hover:bg-gray-50">
          Edit
        </Button>
        <Button
          onClick={onClick}
          className="rounded-md text-sm text-white font-semibold bg-primary hover:bg-primary/80"
        >
          Login Out
        </Button>
      </div>
    </div>
  );
}
