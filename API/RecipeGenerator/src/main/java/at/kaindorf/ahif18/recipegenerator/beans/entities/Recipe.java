package at.kaindorf.ahif18.recipegenerator.beans.entities;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

import javax.persistence.*;
import java.util.ArrayList;
import java.util.List;

@Entity
@Data
@AllArgsConstructor
@NoArgsConstructor
@Table(name="recipe")
public class Recipe {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Integer recipeId;
    private String name;

    private String description;
    private String imageUrl;

    @OneToMany(mappedBy = "recipe", cascade = CascadeType.ALL)
    private List<RecipeIngredient> ingredients = new ArrayList<>();

    @Override
    public String toString() {
        return "Recipe{" +
                "recipeId=" + recipeId +
                ", name='" + name + '\'' +
                ", ingredients=" + ingredients.toString() +
                '}';
    }

    public void setIngredients(List<RecipeIngredient> ingredients) {
        this.ingredients = ingredients;
        for (RecipeIngredient reIn: ingredients) {
            reIn.setRecipe(this);
        }
    }

    public Recipe(String name, List<RecipeIngredient> ingredients, String description, String imageUrl) {
        this.name = name;
        this.ingredients = ingredients;
        this.description = description;
        this.imageUrl = imageUrl;
    }

    public void addIngredient(RecipeIngredient recipeIngredient) {
        this.ingredients.add(recipeIngredient);
    }

    @Data
    @NoArgsConstructor
    public static class RecipeBuilder {
        private Recipe recipe;

        public RecipeBuilder(String name, String description, String imageUrl) {
            this.recipe = new Recipe(name, new ArrayList<>(), description, imageUrl);
        }

        public Recipe build() {
            return this.recipe;
        }

        public RecipeBuilder addIngredient(String ingredientName, String unit, int amount) {
            this.recipe.addIngredient(new RecipeIngredient(new Ingredient(ingredientName, unit), this.recipe, amount));
            return this;
        }
    }
}
