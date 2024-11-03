import React, { useState } from "react";
import ReactQuill, { Quill } from "react-quill";
import "react-quill/dist/quill.snow.css";

interface MultiSelectDropdownProps {
  label: string;
  options: string[];
  selectedOptions: string[];
  onChange: (selected: string[]) => void;
}

const BroadcastNotification: React.FC = () => {
  const [title, setTitle] = useState<string>("");
  const [description, setDescription] = useState<string>("");
  const [content, setContent] = useState<string>("");
  const [filter1, setFilter1] = useState<string[]>([]);
  const [filter2, setFilter2] = useState<string[]>([]);
  const [filter3, setFilter3] = useState<string[]>([]);

  const options1 = ["Option 1", "Option 2", "Option 3"];
  const options2 = ["Option A", "Option B", "Option C"];
  const options3 = ["Option X", "Option Y", "Option Z"];

  const handleFilterChange = (
    selectedOptions: string[],
    setFilter: React.Dispatch<React.SetStateAction<string[]>>
  ) => {
    setFilter(selectedOptions);
  };

  // Custom toolbar for Quill with an image handler
  const toolbarOptions = [
    [{ header: [1, 2, false] }],
    ["bold", "italic", "underline"],
    [{ list: "ordered" }, { list: "bullet" }],
    ["image"], // Image button
    ["clean"],
  ];

  const modules = {
    toolbar: [
      [{ header: [1, 2, false] }],
      ["bold", "italic", "underline"],
      [{ list: "ordered" }, { list: "bullet" }],
      ["image"],
      ["clean"],
    ],
  };

  return (
    <div className="p-6 bg-white shadow-lg rounded-md mx-auto space-y-4">
      {/* Title Input */}
      <input
        type="text"
        value={title}
        onChange={(e) => setTitle(e.target.value)}
        placeholder="Enter title"
        className="w-full p-2 border border-gray-300 rounded"
      />

      {/* Description Input */}
      <textarea
        value={description}
        onChange={(e) => setDescription(e.target.value)}
        placeholder="Enter a small description"
        className="w-full p-2 border border-gray-300 rounded"
        rows={3}
      />

      {/* Filters Section */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        <MultiSelectDropdown
          label="Filter 1"
          options={options1}
          selectedOptions={filter1}
          onChange={(selected) => handleFilterChange(selected, setFilter1)}
        />
        <MultiSelectDropdown
          label="Filter 2"
          options={options2}
          selectedOptions={filter2}
          onChange={(selected) => handleFilterChange(selected, setFilter2)}
        />
        <MultiSelectDropdown
          label="Filter 3"
          options={options3}
          selectedOptions={filter3}
          onChange={(selected) => handleFilterChange(selected, setFilter3)}
        />
      </div>
      {/* Text Editor */}
      <ReactQuill
        id="editor"
        value={content}
        onChange={setContent}
        modules={modules}
        placeholder="Write your content here..."
        className=" rounded min-h-screen"
      />
    </div>
  );
};

const MultiSelectDropdown: React.FC<MultiSelectDropdownProps> = ({
  label,
  options,
  selectedOptions,
  onChange,
}) => {
  const handleOptionChange = (option: string) => {
    const newOptions = selectedOptions.includes(option)
      ? selectedOptions.filter((item) => item !== option)
      : [...selectedOptions, option];
    onChange(newOptions);
  };

  return (
    <div>
      <label className="block text-sm font-medium text-gray-700 mb-1">
        {label}
      </label>
      <div className="border border-gray-300 rounded p-2 space-y-1">
        {options.map((option) => (
          <div key={option} className="flex items-center space-x-2">
            <input
              type="checkbox"
              checked={selectedOptions.includes(option)}
              onChange={() => handleOptionChange(option)}
              className="text-indigo-600 focus:ring-indigo-500 border-gray-300 rounded"
            />
            <span className="text-sm text-gray-700">{option}</span>
          </div>
        ))}
      </div>
    </div>
  );
};

export default BroadcastNotification;
