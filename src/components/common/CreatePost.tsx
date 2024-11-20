import React, { useState, useEffect } from "react";
import imageCompression from "browser-image-compression";
import { addPost } from "../../feature/post/postAction";
import Post from "../common/Post";
import { useAppDispatch, useAppSelector } from "../../app/hooks";
import Swal from "sweetalert2";
import { getDecryptedValue } from "../../feature/auth/utils";
import { peopleInfo } from "../../feature/people/peopleSlice";
import { User } from "../../feature/post/types";

const CreatePost: React.FC = () => {
  const [caption, setCaption] = useState<string>("");
  const [tags, setTags] = useState<string>(""); 
  const [image, setImage] = useState<string | null>(null);
  const [isModalOpen, setIsModalOpen] = useState<boolean>(false);
  const fileInputRef = React.useRef<HTMLInputElement | null>(null);
  const [searchQuery, setSearchQuery] = useState<string>("");
  const [suggestions, setSuggestions] = useState<User[]>([]);
  const { users } = useAppSelector(peopleInfo);
  const dispatch = useAppDispatch();

  // Update suggestions when search query changes
  useEffect(() => {
    if (searchQuery) {
      const filteredUsers = users
        .map((user) => ({ id: user.id, username: user.username })) 
        .filter(
          (user) =>
            user.username.toLowerCase().includes(searchQuery.toLowerCase()) &&
            !tags.split(",").includes(user.id.toString()) 
        );
      setSuggestions(filteredUsers);
    } else {
      setSuggestions([]);
    }
  }, [searchQuery, users, tags]);
  

  const handleSelectUser = (user: User) => {
    setTags((prev) => (prev ? `${prev},${user.id}` : `${user.id}`));
    setSearchQuery("");
    setSuggestions([]);
  };

  const handleRemoveTag = (id: number) => {
    const updatedTags = tags
      .split(",")
      .filter((tagId) => tagId !== id.toString())
      .join(","); 
    setTags(updatedTags);
  };

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setSearchQuery(e.target.value);
  };

  const getPayload = () => {
    return tags;
  };

  const handleImageUpload = async (file: File | null) => {
    if (file) {
      try {
        const options = {
          maxSizeMB: 0.2,
          maxWidthOrHeight: 800,
          useWebWorker: true,
        };
        const compressedImage = await imageCompression(file, options);
        const reader = new FileReader();
        reader.onloadend = () => {
          setImage(reader.result as string);
        };
        reader.readAsDataURL(compressedImage);
      } catch (error) {
        console.error("Image compression failed", error);
      }
    }
  };

  const openModal = () => {
    if (!caption || !image) {
      Swal.fire({
        icon: "error",
        title: "Caption and photo are required!",
        showConfirmButton: false,
        timer: 2500
      });
      return;
    }
    setIsModalOpen(true);
  };

  const closeModal = () => setIsModalOpen(false);
  const currentUserId = getDecryptedValue("id") || "";

  const handlePublish = async () => {
    if (caption && image) {
      try {
        await dispatch(
          addPost({
            userId: currentUserId,
            caption,
            tags: getPayload(), // Pass the comma-separated user IDs as tags
            image: image,
          })
        );
        Swal.fire({
          icon: "success",
          title: "Post created successfully!",
          showConfirmButton: false,
          timer: 2500,
        });
        setCaption("");
        setTags(""); // Reset tags string
        setImage(null);
        closeModal();
      } catch (error) {
        Swal.fire({
          icon: "error",
          title: "An error occurred while creating the post. Please try again.",
          showConfirmButton: false,
          timer: 2500,
        });
      }
    }
  };

  const triggerFileInput = () => {
    if (fileInputRef.current) {
      fileInputRef.current.click();
    }
  };

  const taggedUsersList = tags
  .split(",")
  .map((tagId) => {
    const user = users.find((user) => user.id.toString() === tagId);
    return user ? { id: user.id, username: user.username } : null;
  })
  .filter((user): user is { id: number; username: string } => user !== null);


  return (
    <div className="p-4 bg-white rounded-lg mx-auto mt-10">
      <h2 className="text-2xl font-bold mb-4 ">Create a New Post</h2>
      <form>
        {/* Caption */}
        <div className="mb-4">
          <label className="block text-gray-700 font-semibold mb-2">
            Caption
          </label>
          <textarea
            className="w-full p-2 border rounded-lg"
            rows={4}
            value={caption}
            onChange={(e) => setCaption(e.target.value)}
            placeholder="Write your caption here..."
          />
        </div>

        {/* Tag Friends */}
        <div className="mb-4 relative">
          <label className="block text-gray-700 font-semibold mb-2">
            Tag Friends
          </label>

          {/* Input Field */}
          <div className="w-full p-2 border rounded-lg flex flex-wrap gap-2 items-center">
            {tags.split(",").map((tagId) => {
              const user = users.find((user) => user.id.toString() === tagId);
              return (
                user && (
                  <span
                    key={user.id}
                    className="bg-blue-100 text-blue-600 px-2 py-1 rounded-md flex items-center gap-2"
                  >
                    {user.username}
                    <button
                      onClick={() => handleRemoveTag(Number(user.id))}
                      className="text-red-500 hover:text-red-700 font-bold"
                    >
                      &times;
                    </button>
                  </span>
                )
              );
            })}
            <input
              className="flex-1 p-2 focus:outline-none"
              type="text"
              value={searchQuery}
              onChange={handleInputChange}
              placeholder="Search and tag friends..."
            />
          </div>

          {/* Suggestions Dropdown */}
          {suggestions.length > 0 && (
            <ul className="absolute left-0 right-0 bg-white border rounded-lg mt-1 z-10">
              {suggestions.map((user) => (
                <li
                  key={user.id}
                  onClick={() => handleSelectUser(user)}
                  className="p-2 hover:bg-gray-200 cursor-pointer"
                >
                  {user.username}
                </li>
              ))}
            </ul>
          )}
        </div>

        {/* Add Photo */}
        <div className="mb-4">
          <label className="block text-gray-700 font-semibold mb-2">
            Add Photo
          </label>
          <div
            className="w-full p-4 border-dashed border-2 rounded-lg text-center cursor-pointer"
            onClick={triggerFileInput}
            onDrop={(e) => {
              e.preventDefault();
              handleImageUpload(e.dataTransfer.files[0]);
            }}
            onDragOver={(e) => e.preventDefault()}
          >
            <input
              ref={fileInputRef}
              type="file"
              accept="image/*"
              className="hidden"
              onChange={(e) => handleImageUpload(e.target.files?.[0] || null)}
            />
            {image ? (
              <img
                src={image}
                alt="Preview"
                className="max-w-full max-h-40 mx-auto"
              />
            ) : (
              <p className="text-gray-500">
                Drag & drop an image, or click to select
              </p>
            )}
          </div>
        </div>

        {/* Preview and Publish */}
        <div className="flex justify-center space-x-4">
          <button
            type="button"
            onClick={openModal}
            className="bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700"
          >
            Review Post
          </button>
        </div>
      </form>

      {/* Custom Modal */}
      {isModalOpen && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex justify-center items-center z-50">
          <div className="bg-white rounded-lg shadow-lg p-6 max-w-lg w-full">
            <h3 className="text-xl font-bold mb-4">Preview Your Post</h3>
            <Post
              user={{
                id: users.find((user) => user.id === Number(getDecryptedValue('id')))?.id ?? -1,
                username: users.find((user) => user.id === Number(getDecryptedValue('id')))?.username ?? 'You'
              }}
              taggedUsersInfo={taggedUsersList}
              caption={caption}
              imageUrl={image || ""}
              createdAt={new Date().toISOString()}
              postId={-1}
            />
            <div className="flex justify-end space-x-4 mt-4">
              <button
                onClick={closeModal}
                className="px-4 py-2 bg-gray-300 rounded-lg hover:bg-gray-400"
              >
                Cancel
              </button>
              <button
                onClick={handlePublish}
                className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700"
              >
                Publish
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default CreatePost;
