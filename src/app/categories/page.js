"use client";

import UserTabs from "@/components/layout/UserTabs";
import { useEffect, useState } from "react";
import { useProfile } from "@/components/UseProfile";
import toast from "react-hot-toast";

export default function Categories() {
  const { isLoaded: profileLoaded, data: profileData } = useProfile();
  const [categories, setCategories] = useState([]);
  const [categoryName, setCategoryName] = useState("");
  const [editedCategory, setEditedCategory] = useState(null);

  useEffect(() => {
    fetchCategories();
  }, []);

  function fetchCategories() {
    fetch("/api/categories").then((res) => {
      res.json().then((categories) => {
        console.log(categories);
        setCategories(categories);
      });
    });
  }

  if (!profileLoaded) {
    return "Loading Information....";
  }

  if (!profileData.admin) {
    return "Not an admin";
  }

  const handleCategorySubmit = async (ev) => {
    ev.preventDefault();
    const creationPromise = new Promise(async (resolve, reject) => {
      const data = { name: categoryName };

      if (editedCategory) {
        data._id = editedCategory._id;
      }

      const response = await fetch("/api/categories", {
        method: editedCategory ? "PUT" : "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(data),
      });

      setCategoryName("");
      setEditedCategory(null);
      fetchCategories();

      if (response.ok) {
        resolve();
      } else {
        reject();
      }
    });

    await toast.promise(creationPromise, {
      loading: editedCategory
        ? "Updating Category..."
        : "Creating New Category...",
      success: editedCategory
        ? "Category Successfully Updated!"
        : "Category Successfully Created!",
      error: editedCategory
        ? "Error Updating Category..."
        : "Error Creating Category...",
    });
  };

  async function handleCategoryDelete(_id) {
    const promise = new Promise(async (resolve, reject) => {
      const response = await fetch(`/api/categories?_id=${_id}`, {
        method: "DELETE",
      });
      if (response.ok) {
        resolve();
      } else {
        reject();
      }
    });

    await toast.promise(promise, {
      loading: "Deleting Category...",
      success: "Category Successfully Deleted!",
      error: "Error Deleting Category...",
    });

    fetchCategories();
  }

  return (
    <section className="mt-8 max-w-md mx-auto">
      <UserTabs admin={true} />
      <form className="mt-8" onSubmit={handleCategorySubmit}>
        <div className="flex gap-2 items-end">
          <div className="grow">
            <label className="mx-auto">
              {editedCategory ? "Update Category Name" : "New Category Name"}
              {editedCategory && (
                <>
                  <em>: {editedCategory.name}</em>
                </>
              )}
            </label>
            <input
              type="text"
              value={categoryName}
              onChange={(ev) => setCategoryName(ev.target.value)}
            />
          </div>
          <div className="pb-2 flex gap-2">
            <button type="submit">
              {editedCategory ? "Update" : "Create"}
            </button>
            <button
              type="button"
              onClick={() => {
                setEditedCategory(null);
                setCategoryName("");
              }}
            >
              Cancel
            </button>
          </div>
        </div>
      </form>
      <div>
        <label>{categories.length > 0 && "Existing Categories"}</label>
        {categories.length > 0 &&
          categories.map((cat) => (
            <div className="bg-gray-100 rounded-lg p-2 px-4 flex gap-1 mb-1 items-center">
              <div className="grow">{cat.name}</div>
              <div className="flex gap-1">
                <button
                  type="button"
                  onClick={() => {
                    setEditedCategory(cat);
                    setCategoryName(cat.name);
                  }}
                  className="bg-primary text-white"
                >
                  Edit
                </button>
                <button
                  type="button"
                  onClick={() => handleCategoryDelete(cat._id)}
                  className="border-gray-300"
                >
                  Delete
                </button>
              </div>
            </div>
          ))}
      </div>
    </section>
  );
}
