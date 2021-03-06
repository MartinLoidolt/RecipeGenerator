package at.kaindorf.ahif18.recipegenerator.beans.entities;

import com.fasterxml.jackson.annotation.JsonIgnoreProperties;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

import javax.persistence.*;

@Entity
@Data
@NoArgsConstructor
@AllArgsConstructor
@Table(name="recipe_ingredient")
public class RecipeIngredient {
    @EmbeddedId
    private RecipeIngredientId recipeIngredientId = new RecipeIngredientId();

    @ManyToOne(cascade = CascadeType.ALL)
    @MapsId("recipeId")
    @JoinColumn(name = "ingredient_Id")
    private Ingredient ingredient;

    @ManyToOne(cascade = CascadeType.ALL)
    @MapsId("ingredientId")
    @JoinColumn(name = "recipe_Id")
    @JsonIgnoreProperties("ingredients")
    private Recipe recipe;

    private double amount;

    @Override
    public String toString() {
        return "RecipeIngredient{" +
                ", ingredient=" + ingredient +
                ", amount=" + amount +
                '}';
    }

    public RecipeIngredient(Ingredient ingredient, Recipe recipe, double amount) {
        this.ingredient = ingredient;
        this.recipe = recipe;
        this.amount = amount;
    }
}
