export default function MenuItem({ name, img }) {
  return (
    <div className="bg-gray-200 p-4 rounded-lg text-center group hover:bg-white hover:shadow-md hover:shadow-black/25 transition-all w-1/5 min-w-[12rem] ">
      <div className="text-center">
        <img src={img} alt="boba" className="p-4 max-h-auto max-h-36 mx-auto" />
      </div>
      <h4 className="font-semibold text-black mb-2">{name}</h4>
      <p className="text-secondary-1 text-sm">
        Light, delicious, and perfect for any season!
      </p>
      <button className="bg-primary px-4 py-2 rounded mt-4 text-white text-sm">
        Add to Cart $5
      </button>
    </div>
  );
}
