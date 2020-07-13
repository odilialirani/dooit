class AddCategoryIdToBudget < ActiveRecord::Migration[6.0]
  def change
    add_column :budgets, :category_id, :integer
  end
end
