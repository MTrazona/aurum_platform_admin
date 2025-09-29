import { useState } from "react";

export type AUPUserType = {
  id: number;
  firstName: string | null;
  lastName: string | null;
};

type Props = {
  users: AUPUserType[];
  onSelect: (customerId: number) => void; // ✅ only customerId
};

const AUPUserDropdown = ({ users, onSelect }: Props) => {
  const [searchTerm, setSearchTerm] = useState("");
  const [showDropdown, setShowDropdown] = useState(false);

  const filteredUsers = users.filter((user) => {
    const fullName = `${user.firstName ?? ""} ${user.lastName ?? ""}`.toLowerCase();
    return fullName.includes(searchTerm.toLowerCase());
  });

  const handleSelect = (user: AUPUserType) => {
    setSearchTerm(`${user.firstName ?? ""} ${user.lastName ?? ""}`);
    setShowDropdown(false);
    onSelect(user.id); // ✅ only pass id
  };

  return (
    <div className="relative w-full">
      {/* Input */}
      <input
        type="text"
        value={searchTerm}
        onChange={(e) => {
          setSearchTerm(e.target.value);
          setShowDropdown(true);
        }}
        className="w-full p-2 bg-white rounded-md text-sm"
      />

      {/* Dropdown */}
      {showDropdown && searchTerm && (
        <ul className="absolute left-0 right-0 mt-1 max-h-60 overflow-y-auto border rounded-md bg-white shadow-lg z-10">
          {filteredUsers.length > 0 ? (
            filteredUsers.map((user) => (
              <li
                key={user.id}
                onClick={() => handleSelect(user)}
                className="p-2 cursor-pointer hover:bg-gray-100"
              >
                {user.firstName} {user.lastName}
              </li>
            ))
          ) : (
            <li className="p-2 text-gray-500">No users found</li>
          )}
        </ul>
      )}
    </div>
  );
};

export default AUPUserDropdown;
