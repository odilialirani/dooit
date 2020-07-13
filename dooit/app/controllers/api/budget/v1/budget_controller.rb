class Api::Budget::V1::BudgetController < ApplicationController
  def create
    category = Category.find(user: current_user, title: params[:title])
    budget = Budget.create(
      amount: params[:amount],
      start_date: params[:start_date],
      end_date: params[:end_date]
    )
    budget.category = category
    budget.save!

    render json: budget
  end
end