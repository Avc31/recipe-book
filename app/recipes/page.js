import Recipelist from "../components/Recipelist";

export default function RecipesPage() {
  return (
    <main className="p-6">
      <h1 className="text-2xl font-bold mb-4">All Recipes</h1>
      <div className="flex flex-wrap">
        <Recipelist />
      </div>
    </main>
  );
}
