package at.kaindorf.ahif18.recipegenerator.beans.entities;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

import javax.persistence.Embeddable;
import java.io.Serializable;

@AllArgsConstructor
@NoArgsConstructor
@Data
@Embeddable
public class RecipeIngredientId implements Serializable {
    private Integer recipeId;
    private Integer ingredientId;
}
