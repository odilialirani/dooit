module Budget
  class Budget < ApplicationRecord
    self.table_name = 'budgets'

    belongs_to :user
    belongs_to :category
  end
end