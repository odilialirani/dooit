class Api::Budget::V1::PageController < ApplicationController

  def homepage
    if current_user
      render json: current_user.get_homepage_hash
    else
      render json: {}
    end
  end

  def add_spending
    if current_user
      spending = Budget::Spending.create(
        budget_id: params[:budget_id],
        amount: params[:amount],
        location: params[:location],
        date: params[:date]
      )

      render json: spending
    else
      render json: {}
    end
  end
end