package at.kaindorf.ahif18.recipegenerator.controller;

import at.kaindorf.ahif18.recipegenerator.beans.entities.Ingredient;
import at.kaindorf.ahif18.recipegenerator.beans.entities.Recipe;
import at.kaindorf.ahif18.recipegenerator.beans.entities.RecipeIngredient;
import at.kaindorf.ahif18.recipegenerator.beans.repository.IngredientRepository;
import at.kaindorf.ahif18.recipegenerator.beans.repository.RecipeIngredientRepository;
import at.kaindorf.ahif18.recipegenerator.beans.repository.RecipeRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import javax.annotation.PostConstruct;
import java.net.URI;
import java.util.ArrayList;
import java.util.List;
import java.util.Optional;


@RestController
@RequestMapping("/recipes")
public class RecipeController {
    @PostConstruct
    public void SeedData() {
        Recipe rec = new Recipe.RecipeBuilder("Butterkeks")
                .addIngredient("Butter", 100)
                .addIngredient("Mehl", 200)
                .addIngredient("Milch", 50)
                .build();

        Recipe rec2 = new Recipe.RecipeBuilder("Kuchen")
                .addIngredient("Zucker", 22)
                .addIngredient("Schocko", 42)
                .addIngredient("Ei", 2)
                .build();

        recipeRepository.save(rec);
        recipeRepository.save(rec2);
    }
    @Autowired
    private RecipeRepository recipeRepository;

    @Autowired
    private IngredientRepository ingredientRepository;

    @Autowired
    private RecipeIngredientRepository recipeIngredientRepository;

    @GetMapping(produces = "application/json")
    public ResponseEntity<List<Recipe>> AllRecipes() {
        Iterable<Recipe> iterableRecipes = recipeRepository.findAll();

        List<Recipe> recipesList = new ArrayList<>();

        iterableRecipes.forEach(recipesList::add);

        return ResponseEntity.ok().body(recipesList);
    }

    @RequestMapping("/{name}")
    @GetMapping(produces = "application/json")
    public ResponseEntity<Recipe> GetRecipeByName(@PathVariable String name) {
        try {
            return ResponseEntity.ok().body(recipeRepository.findByName(name));
        } catch(Exception ex) {
            return ResponseEntity.notFound().build();
        }
    }

    @PostMapping(consumes = "application/json")
    public ResponseEntity<Recipe> PostRecipe(@RequestBody Recipe recipe) {
        try {
            for (RecipeIngredient recipeIngredient : recipe.getIngredients()) {
                Optional<Ingredient> optionalIngredient =
                        ingredientRepository.findByName(recipeIngredient.getIngredient().getName());
                if(optionalIngredient.isPresent()) {
                    recipeIngredient.setIngredient(optionalIngredient.get());
                }
            }
            recipeRepository.save(recipe);
            return ResponseEntity.created(URI.create("")).build();
        } catch (Exception ex) {
            return ResponseEntity.badRequest().build();
        }
    }

    @DeleteMapping(consumes = "application/json")
    public ResponseEntity<Recipe> DeleteRecipe(@RequestBody Recipe recipe) {
        try {
            recipeRepository.deleteById(recipe.getRecipeId());
            return ResponseEntity.created(URI.create("")).build();
        } catch (Exception ex) {
            return ResponseEntity.badRequest().build();
        }
    }

    @PutMapping(consumes = "application/json")
    public ResponseEntity<Recipe> PutRecipe(@RequestBody Recipe recipeDTO) {
        try {

            Recipe recipe = recipeRepository.findById(recipeDTO.getRecipeId()).get();

            recipe.setName(recipeDTO.getName());
            recipe.setIngredients(recipeDTO.getIngredients());

            //recipeIngredient has to be updated and saved

            recipeRepository.save(recipe);


            return ResponseEntity.created(URI.create("")).build();
        } catch (Exception ex) {
            System.out.println("ERROR PutRecipe");
            return ResponseEntity.badRequest().build();
        }
    }
}
