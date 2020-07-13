module Budget
  class Spending < ApplicationRecord
    self.table_name = 'budget_spendings'

    belongs_to :budget, class_name: 'Budget::Budget', foreign_key: 'budget_id'
  end
end