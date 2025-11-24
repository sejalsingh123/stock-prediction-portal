from django.shortcuts import render
from rest_framework.views import APIView
from .serializers import StockPredictionSerializer
from rest_framework.response import Response
import yfinance as yf
import pandas as pd
import numpy as np
import matplotlib.pyplot as plt
from datetime import datetime
from .utils import save_plot
from sklearn.preprocessing import MinMaxScaler
from keras.models import load_model
from sklearn.metrics import mean_squared_error,  r2_score

class StockPredictionView(APIView):
    def post(self, request):
        serializer = StockPredictionSerializer(data=request.data)
        if serializer.is_valid():
            ticker = serializer.validated_data['ticker']

            # fetch the data from yfinance
            now = datetime.now()
            start = datetime(now.year-10, now.month, now.day)
            end = now
            #colllect data from past 10 years
            df = yf.download(ticker,start,end,auto_adjust=False) 
            if(df.empty):
                return Response({'status': 'error', 'message': 'Invalid ticker symbol or no data available.'}, status=400)
            df.reset_index()


            # plot basic graph of  closing price
            plt.switch_backend('Agg')  # Use a non-interactive backend
            plt.figure(figsize=(10,5))
            plt.plot(df['Close'])
            plt.xlabel("Day Number")
            plt.ylabel("Closing Price")
            plt.title(f"{ticker} Closing Price vs Day Number")
            
            # save the plot to a file
            plot_image = save_plot(plt, ticker, 'basic_plot')


            # 100 days moving average
            MA_100 = df['Close'].rolling(window=100).mean()
            plt.switch_backend('AGG')
            plt.figure(figsize=(10,5))
            plt.plot(df['Close'])
            plt.plot(MA_100,'r')
            plt.xlabel("Day Number")
            plt.ylabel("Closing Price")
            plt.title(f"{ticker} Closing Price vs 100 Day Number Moving Average")
            # save the plot to a file
            plot_image_100_MA = save_plot(plt, ticker, '100_MA_plot')


            # 200 days moving average
            MA_200 = df['Close'].rolling(window=200).mean()
            plt.switch_backend('AGG')
            plt.figure(figsize=(10,5))
            plt.plot(df['Close'])
            plt.plot(MA_200,'g')
            plt.xlabel("Days")
            plt.ylabel("price")
            plt.title(f"{ticker} Closing Price vs 200Day Number Moving Average")
            plot_image_200_MA = save_plot(plt, ticker, '200_MA_plot')

            # in this we will spit data in 2 parts testing data ,traning data
            data_training = pd.DataFrame(df.Close[0:int(len(df)*0.7)])
            data_testing = pd.DataFrame(df.Close[int(len(df)*0.7):int(len(df))])
           
           #scale the data between 0 and 1
            scaler = MinMaxScaler(feature_range=(0,1))

            # Load Pre trained Model
            model = load_model('stock_prediction_model.keras')


            # prepare test data
            past_100_days_data = data_training.tail(100)
            final_df = pd.concat([past_100_days_data, data_testing], ignore_index=True)
            input_data = scaler.fit_transform(final_df)

            x_test = []
            y_test = []
            for i in range(100, len(input_data)):
                x_test.append(input_data[i-100:i])
                y_test.append(input_data[i,0])
            x_test, y_test = np.array(x_test), np.array(y_test)


            # Predicting the prices
            y_predicted = model.predict(x_test)

            # reshape the data 
            y_predicted = scaler.inverse_transform(y_predicted.reshape(-1,1)).flatten()
            y_test = scaler.inverse_transform(y_test.reshape(-1,1)).flatten()

            #plot the final prediction graph
            plt.switch_backend('AGG')
            plt.figure(figsize=(12,6))
            plt.plot(y_test,'b', label='Original Price')
            plt.plot(y_predicted,'r', label='Predicted Value')
            plt.xlabel("Days")
            plt.ylabel('Price')
            plt.title(f"{ticker} Original vs Predicted Price")
            plt.legend()
            # save the plot to a file
            plot_image_test = save_plot(plt, ticker, 'Predicted_vs_Original_plot')


            #Model Evaluation

            #Root mean square
            mse = mean_squared_error(y_test, y_predicted)
            # root mean suared error(RMSE)
            rmse = np.sqrt(mse)
            # R-squared
            r2 = r2_score(y_test, y_predicted)
            


            return Response({'status': 'success', 
            'plot_image':plot_image, 'plot_image_100_MA':plot_image_100_MA, 'plot_image_200_MA':plot_image_200_MA, 
            'plot_image_test': plot_image_test,
            'RMSE': rmse,
            'R2_Score': r2,
            'mse':mse})
