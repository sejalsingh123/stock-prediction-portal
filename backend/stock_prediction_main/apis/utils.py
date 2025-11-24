import os
from django.conf import settings


def save_plot(plt, ticker, plotType):
    """Saves the plot to the media directory and returns the URL."""
    plot_image_path = f'{ticker}_{plotType}_img.png'
    image_path = os.path.join(settings.MEDIA_ROOT, plot_image_path)
    plt.savefig(image_path)
    plt.close()
    plot_image_url = settings.MEDIA_URL + plot_image_path
    return plot_image_url