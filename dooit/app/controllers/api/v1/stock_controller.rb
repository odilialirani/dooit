class Api::V1::StockController < ApplicationController
  def show
  end

  def stock_params
    params.permit(:symbol)
  end
end
