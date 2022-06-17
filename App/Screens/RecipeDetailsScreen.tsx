import React from 'react';
import {StyleSheet, View, Text, Image, ScrollView} from "react-native";
import {Recipe} from "../Utils/interfaces";
import {Cell, Row, Table, TableWrapper} from "react-native-table-component";

const tableWidthArr = [150, 200];

export default function RecipeDetailsScreen({ route }: any) {

    const recipe: Recipe = route.params;

    return (
      <View style={styles.container}>
            <View style={styles.headerView}>
                <Image
                    key={"image" + recipe.recipeId}
                    style={styles.recipeImage}
                    source={{
                        uri: recipe.imageUrl
                    }}
                />
                <View style={styles.textView}>
                    <Text style={styles.nameText}>{recipe.name}</Text>
                    <Text style={styles.descriptionText}>{recipe.description}</Text>
                </View>
            </View>
          <ScrollView showsVerticalScrollIndicator={false} style={styles.bottomView}>
              <Table>
                  <Row
                      style={styles.headerRow}
                      textStyle={styles.text}
                      data={["Name", "Menge"]}
                      widthArr={tableWidthArr}
                  />
                  {recipe.ingredients.map((ingredient, index) => {
                          return (
                              <View
                                  key={ingredient.ingredient.ingredientId}
                              >
                                  <TableWrapper
                                      style={index % 2 === 0 ? styles.rowPrimary : styles.rowSecondary}
                                  >
                                      <Cell
                                          key={"name" + ingredient.ingredient.ingredientId}
                                          style={styles.nameCell}
                                          textStyle={styles.text}
                                          data={
                                              ingredient.ingredient.name
                                          }
                                      />
                                      <Cell
                                          key={"amount" + ingredient.ingredient.ingredientId}
                                          style={styles.amountCell}
                                          textStyle={styles.text}
                                          data={
                                              ingredient.amount + ' ' + ingredient.ingredient.unit
                                          }
                                      />
                                  </TableWrapper>
                              </View>
                          );
                      })}
              </Table>
          </ScrollView>
      </View>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        margin: '5%',
    },
    headerView: {
        flexDirection: 'row',
    },
    recipeImage: {
        flex: 4,
        flexGrow: 4,
        aspectRatio: 1,
        borderRadius: 3,
        marginRight: '2%',
    },
    textView: {
      flex: 3,
    },
    nameText: {
        fontWeight: 'bold',
    },
    descriptionText: {
    },
    bottomView: {
        marginTop: '5%'
    },
    headerRow: {
        borderBottomWidth: 1,
        borderColor: '#707070',
    },
    text: {
        padding: 5,
    },
    rowPrimary: {
        flexDirection: "row",
    },
    rowSecondary: {
        flexDirection: "row",
        backgroundColor: '#f3f3f3',
    },
    nameCell: {
        width: tableWidthArr[0],
    },
    amountCell: {
        width: tableWidthArr[1],
    },
});