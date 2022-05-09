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

        System.out.println("+++++++++++++++++++++++++");
        System.out.println(this.ingredients);
        System.out.println("-------------------------");
        System.out.println(ingredients);
        System.out.println("+++++++++++++++++++++++++");


        this.ingredients = ingredients;
        System.out.println(this.ingredients);
        System.out.println("**************************");

        for (RecipeIngredient reIn: ingredients) {
            reIn.setRecipe(this);
        }

        System.out.println(this);
        System.out.println("???????????????????????????");
    }

    public Recipe(String name, List<RecipeIngredient> ingredients) {
        this.name = name;
        this.ingredients = ingredients;
    }
}
