module Budget
  class Budget < ApplicationRecord
    self.table_name = 'budgets'

    belongs_to :category, class_name: 'Budget::Category', foreign_key: 'category_id'
  end
end