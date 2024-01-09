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

  return (
    <section className="mt-8 max-w-md mx-auto">
      <UserTabs admin={true} />
      <form className="mt-8" onSubmit={handleCategorySubmit}>
        <div className="flex gap-2 items-end">
          <div className="grow">
            <label>
              {editedCategory ? "Update Category Name" : "New Category Name"}
              {editedCategory && (
                <>
                  : <em>{editedCategory.name}</em>
                </>
              )}
            </label>
            <input
              type="text"
              value={categoryName}
              onChange={(ev) => setCategoryName(ev.target.value)}
            />
          </div>
          <div className="pb-2">
            <button type="submit">
              {editedCategory ? "Update" : "Create"}
            </button>
          </div>
        </div>
      </form>
      <div>
        <label>Edit Categories</label>
        {categories.length > 0 &&
          categories.map((cat) => (
            <button
              onClick={() => {
                setEditedCategory(cat);
                setCategoryName(cat.name);
              }}
              className="bg-gray-200 rounded-lg p-2 px-4 flex gap-1 mb-1 cursor-pointer"
            >
              <span>{cat.name}</span>
            </button>
          ))}
      </div>
    </section>
  );
}
