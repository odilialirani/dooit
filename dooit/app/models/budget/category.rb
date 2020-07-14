module Budget
  class Category < ApplicationRecord
    self.table_name = 'budget_categories'

    belongs_to :user

    has_many :budgets, class_name: 'Budget::Budget', foreign_key: 'category_id'
  end
end
