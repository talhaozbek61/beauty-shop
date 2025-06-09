import { useState } from "react";

import { toast, Toaster } from "sonner";

import Button from "../../../components/ui/button";
import Modal from "../../home/_components/modal";
import Input from "../../../components/ui/input";
import { LogOut, Mail, Pen, User } from "lucide-react";

export default function Heading({ user, updateUser, onClick }) {
  const [isOpen, setIsOpen] = useState(false);
  const [updatedUser, setUpdatedUser] = useState(user);

  const handleUpdateUser = async (e) => {
    e.preventDefault();
    const { success, message } = await updateUser(user?._id, updatedUser);

    if (!success) toast.error(message);
    else toast.success("User Updated");
  };

  return (
    <>
      <Toaster position="bottom-center" />

      <div className="flex items-center justify-between">
        <h2 className="text-2xl/7 font-bold text-gray-900 sm:truncate sm:text-3xl sm:tracking-tight truncate">
          Welcome {user?.name}
        </h2>
        <div className="flex gap-2">
          <Button
            className="rounded-md text-xs font-semibold ring-1 ring-gray-300 ring-inset hover:bg-gray-50 flex items-center gap-1.5"
            onClick={() => setIsOpen(true)}
          >
            <Pen className="size-3" />
            <span className="max-sm:hidden">Edit</span>
          </Button>
          <Button
            onClick={onClick}
            className="rounded-md text-xs text-white font-semibold bg-primary hover:bg-primary/80 flex items-center gap-1.5"
          >
            <LogOut className="size-3" />
            <span className="max-sm:hidden">Login Out</span>
          </Button>
        </div>
      </div>

      {/* Modal */}
      <Modal isOpen={isOpen} setIsOpen={setIsOpen}>
        <h1 className="text-2xl font-medium text-center">Edit Profile</h1>

        <form onSubmit={handleUpdateUser} className="space-y-4">
          {/* Name Input */}
          <Input
            name="name"
            placeholder="Name"
            type="text"
            value={updatedUser?.name}
            icon={User}
            iconClass="size-4"
            onChange={(e) =>
              setUpdatedUser({ ...updatedUser, name: e?.target?.value })
            }
          >
            Name
          </Input>

          {/* Email Input */}
          <Input
            name="email"
            placeholder="Email"
            type="email"
            value={updatedUser?.email}
            icon={Mail}
            iconClass="size-4"
            onChange={(e) =>
              setUpdatedUser({ ...updatedUser, email: e?.target?.value })
            }
          >
            Email
          </Input>

          {/* Modal Buttons */}
          <div className="flex items-center gap-6">
            <Button
              type="button"
              className="bg-transparent ring-1 ring-foreground text-foreground w-full"
              onClick={() => setIsOpen(false)}
            >
              Cancel
            </Button>

            <Button
              type="submit"
              className="bg-foreground text-primary w-full"
              onClick={() => setIsOpen(false)}
            >
              Update
            </Button>
          </div>
        </form>
      </Modal>
    </>
  );
}
