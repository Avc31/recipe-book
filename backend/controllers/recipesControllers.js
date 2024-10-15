import Recipe from "../models/recipes";

export const newRecipe = async (req, res, next) =>{
    const recipe = await Recipe.create(req.body);
    res.status(200).json({
        recipe,
    });
}