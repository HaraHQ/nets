import {
  forwardRef,
  useImperativeHandle,
  useEffect,
  useRef,
  useState,
} from "react";
import { CiFilter, CiSearch } from "react-icons/ci";
import { useDebounce } from "nets/lib/debounce";
import useConfig from "nets/stores/useConfig";

export type SearchHandle = {
  clearInput: () => void;
};

const Search = forwardRef<SearchHandle>((_, ref) => {
  const inputRef = useRef<HTMLInputElement>(null);
  const config = useConfig();
  const [keyInput, setKeyInput] = useState<string>("");

  const debounce = useDebounce(keyInput, 800);

  useImperativeHandle(ref, () => ({
    clearInput() {
      setKeyInput("");
      config.setKeyword("");
      if (inputRef.current) inputRef.current.value = "";
    },
  }));

  useEffect(() => {
    config.setKeyword(debounce);
    // eslint-disable-next-line
  }, [debounce]);

  return (
    <div className="px-4 py-2 flex justify-between items-center">
      <div className="p-2 border border-gray-400 rounded-lg flex-1 flex items-center justify-between">
        <input
          type="text"
          ref={inputRef}
          className="outline-none w-full text-xs"
          placeholder="Search Player"
          onChange={(e) => setKeyInput(e.target.value)}
        />
        <CiSearch />
      </div>
      <div className="w-11 h-fit flex items-center justify-center cursor-pointer">
        <CiFilter className="text-gray-600 text-2xl" />
      </div>
    </div>
  );
});

Search.displayName = "Search";

export default Search;
