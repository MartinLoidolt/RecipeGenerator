package at.kaindorf.ahif18.recipegenerator.beans.entities;

import com.fasterxml.jackson.annotation.JsonIgnore;
import lombok.Data;
import lombok.NoArgsConstructor;

import javax.persistence.*;

@Entity
@Data
@NoArgsConstructor
@Table(name="recipe_ingredient")

public class RecipeIngredient {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private int id;

    @ManyToOne
    @JoinColumn(name = "ingredient_Id")
    private Ingredient ingredient;

    @ManyToOne
    @JoinColumn(name = "recipe_Id")
    @JsonIgnore
    private Recipe recipe;

    private double amount;

    public RecipeIngredient(Recipe recipe, Ingredient ingredients, double amount) {
        this.amount = amount;
        this.recipe = recipe;
        this.ingredient = ingredients;
    }

    @Override
    public String toString() {
        return "RecipeIngredient{" +
                "id=" + id +
                ", ingredient=" + ingredient +
                ", amount=" + amount +
                '}';
    }
}
